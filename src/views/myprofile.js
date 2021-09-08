
import {html} from '../../node_modules/lit-html/lit-html.js'
import { getOwnerMemesById } from '../api/data.js'

const myProfileTemplate = (ownerMemes,username , email, hasMemes) => html`      
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
    <div class="user-content">
        <p>Username: ${username}</p>
        <p>Email: ${email}</p>
        <p>My memes count: ${ownerMemes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
  
    ${hasMemes ? ownerMemes.map(m => html`<div class="user-meme">
        <p class="user-meme-title">${m.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}">
        <a class="button" href="${`details/${m._id}`}">Details</a>
    </div>`) : 
    html` <p class="no-memes">No memes in database.</p>`}
    

   
</div>
</section>`

export async function profilePage(ctx) {
    const username = sessionStorage.getItem('username')
    const email = sessionStorage.getItem('email')
    const userId = sessionStorage.getItem('userId')
    const ownerMemes = await getOwnerMemesById(userId)
    ctx.render(myProfileTemplate(ownerMemes,username , email,ownerMemes != 0))
    
}