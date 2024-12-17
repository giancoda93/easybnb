import SearchIcon from "../../../public/search.svg"

export default function ReactButton({ id, label, clickHandler }) {
  return (
    <button type="button" id={id} onClick={() => clickHandler()}>
      {/* <SearchIcon width={24} height={24}/> */}
      <span className="btn-label">{label}</span>
    </button>
  )
}