import express from 'express';
import IndexController from '../controllers';

export function setRoutes(app: express.Application): void {
  const indexController = new IndexController();
  app.get('/', indexController.getIndex.bind(indexController));
}
