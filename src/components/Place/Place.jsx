export default function Place({text, $hover}) {
    const styles = {
        "transform": ""
    }
    return (
        <div className="place-container">
            {$hover ? text.length : text}
        </div>
    )
}