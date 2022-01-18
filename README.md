### APIs for Biggy Social Media Campaign

---

A Node.js app using [Express](http://expressjs.com/).

## Running Locally

Make sure you have the following installed:
[Node.js](http://nodejs.org/)
[MongoDB](https://mongodb.com)

```sh
git clone https://github.com/preciousdamisa/biggy-sm-campaign.git
cd biggy-sm-campaign
npm install
node start
```

## API Endpoints

- [Signup](http://localhost:3000/api/users/signup)
- [Spcial signup](http://localhost:3000/api/users/signup?refId=<userId>)
- [Login](http://localhost:3000/api/users/login)
- [Get entries for a particular user](http://localhost:3000/api/users/entries/<userId>)
- [View Winners](http://localhost:3000/api/winners)
