package com.example.classAppfileservice.service.fileHandler;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class FileHandlerFactory {

    private static final Map<String, FileHandler> handlerMap = new HashMap<>();

    static {
        handlerMap.put("xlsx", new XlsxFileHandler());
        handlerMap.put("xls", new XlsFileHandler());
        handlerMap.put("csv", new CsvFileHandler());
    }

    public static FileHandler createFileReader(String filename) {
        String fileExtension = getFileExtension(filename);
        FileHandler reader = handlerMap.get(fileExtension.toLowerCase());
        if (reader == null) {
            throw new IllegalArgumentException("Unsupported file type: " + fileExtension);
        }
        return reader;
    }

    private static String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf('.') + 1);
    }

}
