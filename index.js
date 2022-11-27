let dateIp = document.querySelector("#date-ip");
let showBtn = document.querySelector("#show");
let msg = document.querySelector("#msg");


function reverseStr(str){
    let reversedStr = "";
    for(var char of str){
        reversedStr = char + reversedStr;
    }
    return reversedStr;
}

function isPalindrome(str){
    let reversedStr = reverseStr(str);

    if(reversedStr === str){
        return true;
    }else{
        return false;
    }
}

function convertDateToString(date){
    let dateStr = {
        day: "",
        month: "",
        year: ""
    }

    if(date.day < 10){
        dateStr.day = "0" + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getDateInAllFormats(date){
    date = convertDateToString(date);

    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;

    let dateFormats = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateFormats;
}

function checkPalindromeForAllDateFormats(date){
    let dateFormats = getDateInAllFormats(date);

    for(i of dateFormats){
        if(isPalindrome(i)){
            return true;
        }
    }
    return false;
}

function isLeapYear(year){
    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month ;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }

    }else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return(
        {
            day: day,
            month: month,
            year: year
        }
    )
}

function getNextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var counter = 0;

    while(1){
        counter++;
        if(checkPalindromeForAllDateFormats(nextDate)){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [counter,nextDate];
}

let date = {
    day: 27,
    month: 11,
    year: 2022
}

function showMsg(message){
    msg.innerText = message;
    msg.style.display = "block";
}

function checkForPalindrome(){
    let date = dateIp.value;

    if(date === ""){
        showMsg("❌ Enter a valid date");
    }else{
        let dateList = date.split("-");
        var yyyy = dateList[0];
        var mm = dateList[1];
        var dd = dateList[2];

        let dateObj = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        }

        if(checkPalindromeForAllDateFormats(dateObj)){
            showMsg("🎉 Yayy, your b'day is Palindrome!!");
        }else{
            const [counter, newDate] = getNextPalindromeDate(dateObj);
            showMsg(`🛴 The next Palindrome date is : ${newDate.day}-${newDate.month}-${newDate.year}. It ${counter} days away!`)
        }
    }
}

showBtn.addEventListener("click", checkForPalindrome)