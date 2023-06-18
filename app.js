const express=require('express');
const bodyParser=require('body-parser');
const  cors=require('cors');
const nodemailer=require('nodemailer');

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/envio', (req, res)=> {
    const correo=req.body.email;
    console.log(correo);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'escapetours20@gmail.com',
            pass:'okwlvxvmndbdcdum'
        }
    });

    const mailOptions= {
        from:'escapetours20@gmail.com',
        to:correo,
        subject:'En Escape Tours recibimos tu mensaje',
        html:`<h3>Gracias por contactarte con nosotros.</h3>
        <p>Recibimos tu mensaje y en breve nos comunicaremos contigo.</p>
        <p>Saludos!</p>`
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.status(500).send('Error enviar el email');
        } else {
            console.log('Email enviado:', info.response);
            res.status(200).send('Email enviado con éxito');
        }
    });
});


app.listen(port, ()=> {
    console.log('Servidor escuchando en http://localhost:${port}');
});