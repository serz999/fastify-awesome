function validText(field:string){
    var re = /^\w+$/;
    if(!re.test(field)){
        return false;
    }else{
        return true
    }
}
function ValidateEmail(inputText:string)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
    {
        return true;
    }else
    {
        return false;
    }
}

export {validText, ValidateEmail}