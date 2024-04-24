docker login -u "classappservice" -p "Cwl61234;" docker.io
docker build -f Dockerfile -t classappservice/class-app-web:master .
docker images
docker push classappservice/class-app-web:master
