const Handlebars = require('handlebars');
const express_handlebars_sections = require('express-handlebars-sections');

module.exports = {
    section: express_handlebars_sections(),
    category:(maTL,tenTL,myTLs)=>{
        var checked = ''
        for(const item of myTLs){
          if(maTL == item.CATEGORY_ID){
              checked = 'checked'
            break;
          }
        }
        
        return new Handlebars.SafeString(`
        <div class="form-check col-4 align-self-center">
            <input class="form-check-input" type="checkbox" ${checked} name="category" value="${maTL}" id="TL-${maTL}">
            <label class="form-check-label" for="TL-${maTL}">
              ${tenTL}
            </label>
        </div>
        `)
      }
    
}