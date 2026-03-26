package com.michaelolech.readinghub.reader;

import com.michaelolech.readinghub.reader.dto.Book;
import nl.siegmann.epublib.domain.Resource;
import nl.siegmann.epublib.epub.EpubReader;
import nl.siegmann.epublib.service.MediatypeService;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.ToXMLContentHandler;
import org.springframework.stereotype.Service;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
public class ReaderService {

  public List<Book> getBooks() {
    try (Stream<Path> files = Files.list(Paths.get("./books"))) {
      List<Path> result = files
        .filter(p -> !Files.isDirectory(p))
        .filter(p -> p.toString().endsWith(".epub"))
        .toList();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public String readBook(int page) {

      try {

          String pageContent = parseEpubToHTML(page);


          return pageContent;
      } catch (Exception e) {
          e.printStackTrace();
      }

      return null;
  }

  public String parsePDFToHTML() throws IOException, SAXException, TikaException {
      ContentHandler handler = new ToXMLContentHandler();

      AutoDetectParser parser = new AutoDetectParser();
      Metadata metadata = new Metadata();
      try (InputStream stream = this.getClass().getClassLoader()
              .getResourceAsStream("./books/java.pdf")) {
          parser.parse(stream, handler, metadata);
          return handler.toString();
      }
  }

  public String parseEpubToHTML(int page) throws IOException, SAXException, TikaException {
    try (InputStream stream = this.getClass().getClassLoader()
      .getResourceAsStream("./books/java.epub")) {

      EpubReader epubReader = new EpubReader();
      Book book = epubReader.readEpub(stream);



      StringBuilder outputBook = new StringBuilder();


      Collection<Resource> resources = book.getResources().getAll();

      for (Resource resource : resources) {
        if (resource.getMediaType() == MediatypeService.CSS) {

          String css = new String(resource.getData(), UTF_8);

          outputBook
            .append("<style type=\"text/css\">")
            .append(css)
            .append("</style>");
        }
      }

      outputBook
        .append("<style type=\"text/css\">")
        .append("body { max-width: 690px; margin: auto; }")
        .append("</style>");

      for (Resource resource : book.getContents()) {

        String content = resource.getReader().readAllAsString();
        int index = content.indexOf("<span class=\"calibre20\">" + page + "</span>");

        System.out.println(content);

        if (index > -1) {
          int endIndex = content.indexOf("<span class=\"calibre20\">" + (page + 1) + "</span>");

          System.out.println(book.getSpine().getResourceIndex(resource));

          if (endIndex > -1) {
            outputBook.append(content, index, endIndex);
          } else {
            outputBook.append(content);
          }

          return outputBook.toString();
        }
      }

      return outputBook.toString();
    }
  }
}
