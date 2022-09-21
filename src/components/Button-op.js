const Buttonopt = ({st_name,content,onadd}) =>
{
     return (
        <div>
            <button className={st_name} onClick={onadd}>{content}</button>
        </div>
     )
}
export default Buttonopt;