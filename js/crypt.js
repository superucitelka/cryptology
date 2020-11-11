/* Ukázkový kód */
/* Ukázka použití funkcí: 
   charCodeAt(pozice) - vrací kód znaku na určité pozici v řetezci
   toString(základ soustavy) - převádí číslo na řetězec v určené číselné soustavě 
   String.fromCharCode(kód) - vrací Unicode znak na základě předaného kódu */
console.log('10 €'.charCodeAt(0).toString(16));
console.log(String.fromCharCode(8531));

/* Objekt Enigma - jednoduchý softwarový šifrovací stroj */
var Enigma = {
    /* Atributy objeku */
    text : '', // Výchozí text, který má být zašifrován
    code : '', // Zašifrovaný text
    password: '',
    /* Metody objektu */
    /* Zašifruje výchozí text s použitím hesla */
    encrypt: function(data = this.text) {
        var result = '';
        /* Cyklus prochází všechny znaky ve výchozím textu */
        for (var i = 0; i < data.length; i++) {
            /* Sečte kód jednoho znaku z výchozího textu s kódem jednoho znaku hesla.
               Je-li heslo příliš krátké, použije se znovu od prvního znaku. */
            result += String.fromCharCode(data.charCodeAt(i) + this.password.charCodeAt(i % this.password.length));
        }
        this.code = result;
        return result;
    },
    /* Dešifruje zakódovaný text s použitím hesla opačným postupem - odečtením kódů dvou znaků */
    decrypt: function(data = this.code) {
        var result = '';
        for (var i = 0; i < data.length; i++) {
            result += String.fromCharCode(data.charCodeAt(i) - this.password.charCodeAt(i % this.password.length));            
        }
        return result;
    },
    /* Metoda vypisuje všechny znaky v zadaném řetězci v jejich binární reprezentaci (oddělené mezerou) */
    binary: function(data = this.text) {
        var result = '';
        for (var i = 0; i < data.length; i++) {
            result += data.charCodeAt(i).toString(2) + ' ';
        }
        return result;
    }
}

/* Akce po kliknutí na tlačítko Zašifrovat (id=encrypt) */
document.getElementById('encrypt').addEventListener('click', function(){
    Enigma.text = document.getElementById('source').value;
    Enigma.password = document.getElementById('password').value;
    document.getElementById('target').value = Enigma.encrypt();
    console.log(Enigma.binary(document.getElementById('source').value));
});

/* Akce po kliknutí na tlačítko Dešifrovat (id=decrypt) */
document.getElementById('decrypt').addEventListener('click', function(){
    Enigma.code = document.getElementById('target').value;
    Enigma.password = document.getElementById('password').value;
    document.getElementById('source').value = Enigma.decrypt();
});