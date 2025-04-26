const Label = ({labelText , htmlFor}) => {


    return(
        <label htmlFor={htmlFor} style={{fontFamily:'gandom' , margin:'.5rem'}} >{labelText}</label>
    )
}

export default Label