const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.use(cookieParser())

let sugar = 0
let chocolate = 0
let lemon = 0

app.get('/', (req, res)=>{
	sugar = req.cookies.sugar || 0
	chocolate = req.cookies.chocolate || 0
	lemon = req.cookies.lemon || 0	

	return res.render('confectionary', {sugar, chocolate, lemon})
})

app.post('/sugar', (req, res)=>{
	sugar++
	res.cookie('sugar', sugar, {maxAge: 80000000})
	res.redirect('/')
})

app.post('/chocolate', (req, res)=>{
	chocolate++
	res.cookie('chocolate', chocolate, {maxAge: 80000000})
	res.redirect('/')
})

app.post('/lemon', (req, res)=>{
	lemon++
	res.cookie('lemon', lemon, {maxAge: 80000000})
	res.redirect('/')
})

app.post('/guilty-free', (req, res)=>{
	sugar = 0
	chocolate = 0
	lemon = 0

	res.cookie('sugar', sugar, {maxAge: 80000000})
	res.cookie('chocolate', chocolate, {maxAge: 80000000})
	res.cookie('lemon', lemon, {maxAge: 80000000})

	res.redirect('/')
})




app.listen(PORT, ()=>{
	console.log('Server running....')
})