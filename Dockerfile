FROM node:20

RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

RUN npm install pm2 -g

USER node
WORKDIR /usr/src/app

COPY --chown=node package.json .
COPY --chown=node package-lock.json .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

COPY --chown=node . .
RUN npm install
RUN npm run build


EXPOSE 3000

CMD ["pm2-runtime", "dist/app.js"]