package com.michaelolech.readinghub.reader;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/v1")
public class ReaderController {
  private final ReaderService readerService;

  public ReaderController(ReaderService readerService) {
      this.readerService = readerService;
  }

  @GetMapping("/books")
  public String getBooks(){
    return this.readerService.g(page);
  }

  @GetMapping("/books/{page}")
  public String getBook(@PathVariable int page){
      return this.readerService.readBook(page);
  }
}
