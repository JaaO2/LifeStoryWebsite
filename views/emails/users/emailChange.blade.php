<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://kit.fontawesome.com/8a564a3416.js" crossorigin="anonymous"></script>

        <style>
            .mail {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                border-bottom: 4px solid #000;
            }

            .mail_Header {
                background: #005881;
                color: #fff;
                font-size: 20px;
                text-align: center;
                padding: 10px;
            }

            .mail_Content {
                background: #fff;
                color: #000;
                text-align: center;
                padding: 20px;
            }

            .mail_Content button {
                background: #005881;
                margin: 10px;
                color: #fff;
                outline: none;
                border: none;
                padding: 10px;
                font-size: 18px;
            }

            .mailContent button:hover {
                background: #003660;
                cursor: pointer;
            }

        </style>
    </head>

    <body>
        <div className="mail">
            <div class="mail_Header">
                Life Story - zmiana adresu email
            </div>
            <div class="mail_Content">
                <p>Witaj, {{$username}}!</p>
                <p>Kliknij link poniżej, aby potwierdzić zmianę adresu email. Adres email zostanie zmieniony dopiero w momencie potwierdzenia.</p>
                <p>Jeśli to nie Ty próbowałeś przypisać ten adres email do konta w serwisie Life Story, zignoruj tą wiadomość</p>
                <a href="{{env('APP_URL')}}/users/email/verify/{{$token}}"><button>Potwierdź email</button></a>
                <p>Pozdrawiamy, Ekipa Life Story</p>
            </div>
        </div>
    </body>
</html>