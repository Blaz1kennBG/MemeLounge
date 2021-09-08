import {html} from '../../node_modules/lit-html/lit-html.js'

const registerTemplate = (onRegister) => html`        
<section id="register">
<form @submit=${onRegister} id="register-form">
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="/login">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>`;

export async function registerPage(ctx) {
ctx.render(registerTemplate(onRegister))

 async function onRegister(ev) {
     ev.preventDefault()
    const form = ev.target
    const formData = new FormData(form)
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    const repass = formData.get('repeatPass')
    const gender = formData.get('gender')
    if (username == '' || email == '') {
        return ctx.showError('All fields are required')
    } else if (password != repass) {
        return ctx.showError('Passwords don\'t match')
    }
    try {
        await api.register(username,email,password,gender)
        ctx.setUserNav()
        ctx.page.redirect('/browse')

    } catch(err) {
        ctx.showError(err)
    }
 }
}
