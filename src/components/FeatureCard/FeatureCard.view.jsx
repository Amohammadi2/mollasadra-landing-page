import "./style.css"
import SoftwareServiceImg from "../../assets/icons/software-service.png"

export default function FeatureCard({ title, description, Icon, softwareService=false, }) {
  return (
    <div className="
      flip-card
      w-full h-36 m-2
      drop-shadow-lg rounded-lg
    ">
      <div className="flip-card-inner h-36">
        <section className="flip-card-front flex flex-col justify-center items-center h-36"> { /* Card front face */ }
          {softwareService && <img src={SoftwareServiceImg} style={{width: "85px", height: "70px"}} />}
          {Icon && Icon}
          <p className="mt-5">{title}</p>
        </section>
        <section className="flip-card-back pt-2 px-3 h-36"> { /* Card back face */ }
          {description}
        </section>
      </div>
    </div>
  );
}
