package com.example.classAppfileservice.service.upload;

import com.example.classAppfileservice.service.fileHandler.FileHandlerProcessor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileUploadServiceImpl implements FileUploadService{
    @Autowired
    private FileHandlerProcessor fileHandlerProcessor;

    @Override
    public Response uploadSingleFile(MultipartFile file) throws IOException {
        fileHandlerProcessor.readFile(file);
        return null;
    }
}
