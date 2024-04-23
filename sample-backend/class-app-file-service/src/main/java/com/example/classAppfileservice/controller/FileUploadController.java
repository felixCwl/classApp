package com.example.classAppfileservice.controller;

import com.example.classAppfileservice.service.upload.FileUploadService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Log4j2
@RestController
@RequestMapping("/${file-service-endpoint.file-upload-path}")
public class FileUploadController {
  @Autowired
  private FileUploadService fileUploadService;

  @PostMapping(value = "/uploadSingleFile")
  public ResponseEntity uploadSingleFile(@RequestParam("file") MultipartFile file) throws IOException {
    fileUploadService.uploadSingleFile(file);
    return ResponseEntity.ok("File uploaded successfully!");
  }

  @PostMapping(value = "/uploadMultipleFiles")
  public ResponseEntity uploadMultipleFiles(@RequestParam("files") MultipartFile[] files){
    return ResponseEntity.ok("Files uploaded successfully!");
  }

  @Async("asyncFileUploadExecutor")
  @PostMapping(value = "/uploadAsyncMultipleFiles")
  public ResponseEntity uploadAsyncMultipleFiles(@RequestParam("files") MultipartFile[] files){
    return ResponseEntity.ok("Files uploaded successfully!");
  }

}
