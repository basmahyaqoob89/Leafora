import { ChevronDown, Sprout } from 'lucide-react';
import { plantVillageClassCount, supportedPlants } from '../config/modelCoverage';

const plants = [...supportedPlants].sort((a, b) => a.plant.localeCompare(b.plant));

export default function ModelCoverage() {
  return (
    <section className="section model-coverage" id="coverage" aria-labelledby="coverage-title">
      <div className="coverage-inner">
        <div className="coverage-intro reveal">
          <div>
            <div className="eyebrow">Planned model coverage</div>
            <h2 id="coverage-title">What Can LEAFORA <i>Identify?</i></h2>
            <p>LEAFORA is designed to classify only the plant species and disease or healthy conditions represented in the PlantVillage dataset from Kaggle. The dataset contains 54,305 RGB leaf images. Each class pairs a plant with a condition, and one species can appear in several classes.</p>
          </div>
          <div className="coverage-count">
            <strong>{plantVillageClassCount}</strong>
            <span>Plant Health Classes</span>
            <small>PlantVillage dataset</small>
          </div>
        </div>

        {plants.length > 0 ? (
          <ul className="coverage-grid" aria-label="Supported plants and conditions">
            {plants.map(({ plant, classes }) => (
              <li key={plant}>
                <details className="coverage-card coverage-plant" name="plant-coverage">
                  <summary>
                    <Sprout size={18} aria-hidden="true" />
                    <span>{plant}</span>
                    <ChevronDown className="coverage-chevron" size={18} aria-hidden="true" />
                  </summary>
                  <ul>{classes.map(label => <li key={label}>{label}</li>)}</ul>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <div className="coverage-card">
            <Sprout size={24} aria-hidden="true" />
            <h3>Plant and condition list pending</h3>
            <p>Each plant card will expand to show its supported diseases and healthy conditions once the exact PlantVillage class labels are available.</p>
          </div>
        )}
        <p className="coverage-warning">LEAFORA supports a limited range of plants and conditions. Images outside these supported classes may produce unreliable results.</p>
      </div>
    </section>
  );
}
