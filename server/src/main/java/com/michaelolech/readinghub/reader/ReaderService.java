package com.michaelolech.readinghub.reader;

import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.ToXMLContentHandler;
import org.springframework.stereotype.Service;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;

@Service
public class ReaderService {

    public String readBook(int page) {

        try {

            String pageContent = parseToHTML();
            System.out.println("Page - " + page);
            System.out.println(pageContent);

            return pageContent;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public String parseToHTML() throws IOException, SAXException, TikaException {
        ContentHandler handler = new ToXMLContentHandler();

        AutoDetectParser parser = new AutoDetectParser();
        Metadata metadata = new Metadata();
        try (InputStream stream = this.getClass().getClassLoader()
                .getResourceAsStream("./books/java.pdf")) {
            parser.parse(stream, handler, metadata);
            return handler.toString();
        }
    }
}
