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
                Life Story - rejestracja konta
            </div>
            <div class="mail_Content">
                <p>Witaj, {{$username}}!</p>
                <p>Aby ukończyć rejestrację i zalogować się do gry musisz potwierdzić swój adres email. Żeby to zrobić kliknij w przycisk poniżej.</p>
                <p>Jeśli to nie Ty zakładałeś konto w naszym projekcie zignoruj tą wiadomość.</p>
                <a href="{{env('APP_URL')}}/users/email/verify/{{$token}}"><button>Potwierdź email</button></a>
                <p>Pozdrawiamy, Ekipa Life Story</p>
            </div>
        </div>
    </body>
</html>