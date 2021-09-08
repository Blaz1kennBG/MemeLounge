import * as api from './src/api/data.js'
import { homePage } from './src/views/home.js'
import { loginPage } from './src/views/login.js'
import { registerPage } from './src/views/register.js'
import { browsePage } from './src/views/browse.js'
import { createPage } from './src/views/create.js'
import { detailsPage } from './src/views/details.js'
import { editPage } from './src/views/edit.js'
import {profilePage} from './src/views/myprofile.js'
//import {setUserNav} from './src/views/navigationUpdate.js'


import {html, render } from './node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


window.api = api
const main = document.querySelector('main')
const nav = document.querySelector('#container nav')
const notification = document.getElementById('errorBox')



page('/', decorateContent, homePage)
page('/index.html', decorateContent, homePage)
page('/login', decorateContent, loginPage)
page('/register', decorateContent, registerPage)
page('/browse', decorateContent, browsePage)
page('/create', decorateContent,createPage)
page('/details/:id', decorateContent, detailsPage)
page('/edit/:id', decorateContent, editPage)
page('/my-profile', decorateContent, profilePage)
page.start()



  

async function showError(msg) {
    notification.querySelector('span').textContent=msg
    notification.style.display='block'
    
    setTimeout(() => notification.style.display='none', 3000)


}

function decorateContent(ctx, next) {

    ctx.setUserNav = setUserNav
    ctx.showError = showError
    ctx.render = (content) => render(content, main)
    setUserNav()
    next()
}

// Navigation function
function setUserNav() {
    let token = sessionStorage.getItem('authToken')
    if (token != null) {
        document.querySelector('#container > nav .guest').style.display='none'
        document.querySelector('#container > nav .user').style.display='block'
         document.querySelector('#container > nav > .user > .profile > span').textContent='Welcome, ' + sessionStorage.getItem('email')
         document.querySelector('#logoutBtn').addEventListener('click', async () => {
            await api.logout()
            page.redirect('/')
         })
    } else {
        document.querySelector('#container > nav .guest').style.display='block'
        document.querySelector('#container > nav .user').style.display='none'
    }
 


}

/* function setUserNav() {
    const userNavTemplate = (isLogged, email) => html`    
   
    <a href="/browse">All Memes</a>
     
    ${ isLogged ? html`
    <!-- Logged users -->
    <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${email}</span>
                    <a href="/my-profile">My Profile</a>
                    <a @click=${onLogout} href="/home">Logout</a>
                </div>` : html`
                <!-- Guest users -->
                <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}
    
    `;
    
    let userId = sessionStorage.getItem('userId')
    const email = sessionStorage.getItem('email')
    render(userNavTemplate(userId != null, email, onLogout), nav)
    async function onLogout() {
       
            await api.logout()
            
            userId = sessionStorage.getItem('userId')
            
            render(userNavTemplate(userId != null, email, onLogout), nav)
            page.redirect('/')
 
    }
} 

 */


console.log('App.js loaded')