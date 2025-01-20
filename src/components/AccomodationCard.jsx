
export default function AccomodationCard({ image, name, city, country, rating, price}) {
  return (
    <div className="accomodation-card">
      <div className="card-container">
        <img src={image} alt="main photo" className="photo" />
        <div className="title">
          <span className="name">{name}</span>
          <span className="rating">★ {rating}</span>
        </div>
        <span className="location">{city}, {country}</span>
        <span className="price"><strong>{price} €</strong> notte</span>
      </div>
    </div>
  )
}
