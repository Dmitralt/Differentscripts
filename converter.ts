function convertURL(enterURL:string){
    enterURL=enterURL.replace("/campaigns?","");

    let arr=enterURL.split("&");
    for(let line in arr){

        if(arr[line].indexOf("sort=")==0){
            let elements = arr[line].replace("sort=","").split(","); 
            arr[line]="sort: [";
            for(let i in elements){
                if(elements[i][0]=="-"){
                    elements[i]="[\""+elements[i].slice(1)+"\", \"desc\"]";
                }
                else  if(elements[i][0]=="+"){
                    elements[i]="[\""+elements[i].slice(1)+"\", \"asc\"]";
                }               
            }
            arr[line]=arr[line]+elements.join(",");
            arr[line]=arr[line]+"]";
        }
        if(arr[line].indexOf("fields=")==0){
            arr[line]="fields: [\""+arr[line].replace("fields=","").split(",").join("\",\"")+"\"]";
        }
        if(arr[line].indexOf("offset=")==0){
            arr[line]=arr[line].replace("offset=","offset: ");
        }
        if(arr[line].indexOf("limit=")==0){
            arr[line]=arr[line].replace("limit=","limit: ");
        }
        if((arr[line].indexOf("=in:")!=-1)||(arr[line].indexOf("=nin:")!=-1)||(arr[line].indexOf("=ne:")!=-1)){//для полей ин нин не

            let fieldname="";
            if(arr[line].indexOf("=in:")!=-1)
            {
                 fieldname = arr[line].split('=in:')[0];
            }
            if(arr[line].indexOf("=nin:")!=-1)
            {
                 fieldname = arr[line].split('=nin:')[0];
            }
            if(arr[line].indexOf("=ne:")!=-1)
            {
                 fieldname = arr[line].split('=ne:')[0];
            }
            
            if((arr[line].indexOf(fieldname+"=in")!=-1)||(arr[line].indexOf(fieldname+"=nin")!=-1)){
                let elements;
                if((arr[line].indexOf(fieldname+"=in")!=-1)){
                    elements=arr[line].replace(fieldname+"=in:","");  
                    arr[line]=fieldname+": { $in: [";
                }    
                else{
                    elements=arr[line].replace(fieldname+"=nin:","");
                    arr[line]=fieldname+": { $nin: [";
                }  
               
                arr[line]=arr[line]+"\""+elements.split(",").join("\",\"")+"\"";        
                arr[line]=arr[line]+"] }"
            }   
            else if(arr[line].indexOf(fieldname+"=ne")!=-1) {
                arr[line]=arr[line].replace(fieldname+"=ne:",fieldname+": {$ne:");  
                arr[line]=arr[line]+"}"                
            }
        }
        if((arr[line].indexOf(",")==-1)){
            arr[line]=arr[line].replace(">=",":{ $gte: ");
            arr[line]=arr[line].replace(">",":{ $gt: ");
            arr[line]=arr[line].replace("<=",":{ $lte: ");
            arr[line]=arr[line].replace("<",":{ $lt: ");
            if((arr[line].indexOf("$")!=-1))
            {arr[line]=arr[line]+"}";}

            arr[line]=arr[line].replace("=",": ");

        }
    }


    console.log(arr);
}

convertURL("/campaigns?start>=2376872&owner=22&grooooups=in:group1,group2,group3&sort=-owner,+start&fields=start,end,id&offset=10&limit=5&rgb<=12345&one=2&grp=ne:98,78&ytr=nin:1,2,3");
