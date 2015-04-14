default: deploy

deploy: 
	git push heroku master

set_origin:
	heroku git:remote -a king-meme-generator