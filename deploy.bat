@echo off
REM This is the main batch file

REM Call another batch file
.\sample-backend\class-app-eureka-service\deploy.bat
.\sample-backend\class-app-file-service\deploy.bat
.\sample-backend\class-app-class-service\deploy.bat
.\sample-frontend\deploy.bat


REM Continue with the rest of the commands in the main batch file
echo Batch file execution completed.
