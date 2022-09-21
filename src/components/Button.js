const Button = ({st_name,content}) =>
{
     return (
        <div>
            <button type="submit" className={st_name}>{content}</button>
        </div>
     )
}

export default Button;