const imageFile = document.querySelector('#imageFileInput');
const topText = document.querySelector('#topTextInput');
const bottomText = document.querySelector('#bottomTextInput');
const canvas = document.querySelector('#meme');
const download = document.querySelector('#btn-submit');
let image = '';

window.onload=function(){
    download.style.display='none';
  }  

imageFile.addEventListener('change', (e)=>{
    const ImageUrl = URL.createObjectURL(e.target.files[0]);
    console.log(ImageUrl);

    image =new Image();
    image.src = ImageUrl;

    image.addEventListener('load', ()=>{
        updateMeme(canvas,image,topText.value,bottomText.value);
    },{once: true});
});

topText.addEventListener('change', ()=>{
    updateMeme(canvas,image,topText.value,bottomText.value);
});

bottomText.addEventListener('change', ()=>{
    updateMeme(canvas,image,topText.value,bottomText.value);
});

function updateMeme(canvas, image, topText, bottomText){
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width/10);
    const yoffset = height/25;

    //update canvas 
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image,0,0);


    //prepare text
    ctx.strokStyle ="black";
    ctx.lineWidth = Math.floor(fontSize/4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.linejoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    //add Top text
    ctx.textBaseline ="top"
    ctx.strokeText(topText, width/2, yoffset);
    ctx.fillText(topText, width/2, yoffset );

    //add bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width/2, height - yoffset);
    ctx.fillText(bottomText, width/2, height - yoffset);

    //Downoad image
    download.style.display='block';  
    download.addEventListener('click', ()=>{
        const dataURL = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = "meme.png";
        link.click();
    });  

}