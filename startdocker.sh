docker build -t web2ink .
docker run -e AUTH=changeme2 -p 127.0.0.1:3000:3000 web2ink
