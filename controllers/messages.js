
const sendMail = async (req, res) => {
    try {
        sendMail()//(req.body.email)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
}

