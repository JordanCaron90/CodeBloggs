# mern-stack-example

Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run

Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
```

Start server:

```
cd mern/server
npm install
npm start
```

Start Web server

```
cd mern/client
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product

## Reactive and Responsive Design

# Reactive Design

Reactive design is an approach to designing websites and applications that focuses on creating dynamic and interactive user experiences. Reactive design involves designing user interfaces that respond to user actions and provide immediate feedback, often using animations and other visual effects to engage users and make the experience more engaging. Reactive design typically involves the use of modern web technologies such as JavaScript and AJAX to enable seamless interactions between the user and the interface.

# Responsive

Responsive design is a design approach that aims to create websites and applications that adapt to different screen sizes and device types. The goal of responsive design is to ensure that content is presented in an optimal way regardless of the device being used to access it, whether it's a desktop computer, a tablet, or a mobile phone. Responsive design typically involves the use of flexible layouts, media queries, and other techniques that allow the website or application to adjust its layout and content based on the size and orientation of the screen. This approach ensures that users have a consistent and seamless experience regardless of how they access the content.
