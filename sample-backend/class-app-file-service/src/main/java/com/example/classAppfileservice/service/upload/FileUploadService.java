package com.example.classAppfileservice.service.upload;

import org.apache.coyote.Response;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {
    public Response uploadSingleFile(MultipartFile files) throws IOException;
}
