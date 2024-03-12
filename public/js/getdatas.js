function editData(data) {
    var a = 0;

    // var body = document.body;
    body.innerHTML="";
    data.forEach(block => {
         a++;
        
        var bText = "<h1>Block " + a + " :<hr></h1>";
        body.innerHTML +=bText;
        var dText;
        for (const [key1, value1] of Object.entries(block)) {
                // console.log(key1, value1);
                if (key1 == "datam") {
                    for (const [key2, value2] of Object.entries(value1)) {
                        // console.log(key2, value2);
                        dText = `<p><span class="k"> ${key2}:</span> <span class="v">${value2}</span></p>`;

                    }
                } else {
                        dText = `<p><span class="k"> ${key1}:</span> <span class="v">${value1}</span></p>`;
                    // console.log(key1);
                }


                body.innerHTML +=dText;
                
        }

        body.innerHTML +="<hr/>";
        body.style.textAlign="center";

        document.getElementById("body").scrollTop += 300;

    });
}

var chain = "Chain";
function setChain(data) {localStorage.setItem(chain, JSON.stringify(data));}

function getChain(x) {
    if (x) {
        var c = JSON.parse(localStorage.getItem(chain));
        editData(c);
    }
}


var bbb = []

setChain(bbb);

function getData() {
    var ok = false;
    const apiUrl = "/blocks";

    fetch(apiUrl)
    .then(response => {
        // console.log(response.status);
        if (response.ok && response.status != 304) {
            return response.json();
        }
    })
    .then(data => {
        var chainLen = JSON.parse(localStorage.getItem(chain)).length;
       
        if (chainLen < data.length) {
            setChain(data);
            ok = true;
            console.log(chainLen, data.length);
        } else if(chainLen > data.length) {
            
            JSON.parse(localStorage.getItem(chain)).forEach(b => {
                setData(b.data);
            });

            ok = true;

        }
        getChain(ok);
        
    })
    .catch(error => {
      console.error('Fetch hatası:', error);
    });


}


function setData(data) {
    const postData = {data: data};

   fetch("/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData), 
    })
   .then(response => {
        console.log(response);
       if (response.ok) {
            return response.json();
       }
   })
   .then(data1 => {
       console.log("Veri eklendi:", data);
   })
   .catch(error => {
       console.error("Veri eklenirken bir hata oluştu:", error);
   });
}

function event1() {
    var getdata = theData.value;
    
    setData(getdata);
    
    theData.value = "";


    getData();
    
}

setInterval(() => {
    getData(); 
}, 5000);

// getData(); 


console.log(body.scrollTop);

send.addEventListener("click",event1);
document.addEventListener('keydown', event => {
    if(event.key == "Enter")event1();
  });

