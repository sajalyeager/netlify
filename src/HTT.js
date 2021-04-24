import React from 'react'

const HTT = () => {
    return (
        <div>
            <form action="//www.html.am/html-codes/forms/html-form-tag-action.cfm" target="result" method="get">
<p>What would you like for lunch?</p>
<select name="fruit">
<option value ="none">Nothing</option>
<option value ="guava">Guava</option>
<option value ="lychee">Lychee</option>
<option value ="papaya">Papaya</option>
<option value ="watermelon">Watermelon</option>
</select> 
<p><input type="submit" value="Submit"></input></p>
</form>

<iframe name="result" style="height:100px;width:200px;"></iframe>

        </div>
    )
}

export default HTT
