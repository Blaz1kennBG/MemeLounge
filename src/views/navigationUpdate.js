import {html} from '../../node_modules/lit-html/lit-html.js'
import {render} from '../../node_modules/page/page.mjs'
    const userNavTemplate = (isLogged, email) => html`    
   
    <a href="/browse">All Memes</a>
    
    ${isLogged ? html`
    <!-- Logged users -->
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${email}</span>
            <a href="/my-profile">My Profile</a>
            <a @click=${onLogout}href="/home">Logout</a>
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
    export async function setUserNav(ctx) {
        let userId = sessionStorage.getItem('userId')
        const email = sessionStorage.getItem('email')
       render(userNavTemplate(userId != null, email, onLogout))
        async function onLogout() {

            await api.logout()

            userId = sessionStorage.getItem('userId')
            render(userNavTemplate(userId != null, email, onLogout))

        }
    }
