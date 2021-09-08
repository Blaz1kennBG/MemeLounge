import {html} from '../../node_modules/lit-html/lit-html.js'



const editTemplate = (meme,onSubmit) => html` 
 <section id="edit-meme">
<form @submit=${onSubmit}id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>

            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`

export async function editPage(ctx) {
    const id = ctx.params.id
    const meme = await api.getMemeById(id)
 
 
    ctx.render(editTemplate(meme, onSubmit))
    async function onSubmit(ev) {
        ev.preventDefault()
        const form = ev.target
        const formData = new FormData(form)
        const title = formData.get('title')
        const description = formData.get('description')
        const imageUrl = formData.get('imageUrl')
        if (title == '' || description == '' || imageUrl == '') {
            return ctx.showError('All fields are required!')

        }
        try {
         const meme = await api.editMeme(id,{
            title,
            description,
            imageUrl
        })
        ctx.page.redirect('/browse')
    } catch(err) {
        ctx.showError(err)

    }
    }

}