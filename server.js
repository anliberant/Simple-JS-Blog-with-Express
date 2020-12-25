import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import articleModel from './models/article.js';
import articleRouter from './routes/articles.js';

const app = express();
const POST = 5000;

//mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/blog', 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: false } ));
app.use(methodOverride('_method'));
app.get('/', async (req, res) => {
    const articles = await articleModel.find().sort({ createdAt: 'desc'});
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(POST);