import { useState, useEffect } from 'react';
import { bases, granola, fruitToppings, dryToppings, drizzles } from '../../data/menuData';
import { useCart } from '../../context/CartContext';

const STEPS = ['Base', 'Granola', 'Fruit', 'Toppings', 'Drizzle'];

const DEFAULT_GOALS = {
  calories: 2000,
  protein: 50,
  carbs: 250,
  fiber: 25,
  sugar: 50
};

const PRESETS = {
  weightLoss: { calories: 1500, protein: 60, carbs: 150, fiber: 30, sugar: 30 },
  muscleGain: { calories: 2800, protein: 120, carbs: 350, fiber: 35, sugar: 60 },
  maintenance: { calories: 2000, protein: 50, carbs: 250, fiber: 25, sugar: 50 }
};

export default function BuildYourOwn() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGoals, setShowGoals] = useState(false);
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goodfood_goals');
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });
  const [selections, setSelections] = useState({
    base: null,
    granola: null,
    fruits: [],
    dryToppings: [],
    drizzles: []
  });
  const { addItem } = useCart();

  useEffect(() => {
    localStorage.setItem('goodfood_goals', JSON.stringify(goals));
  }, [goals]);

  const handleSelect = (category, item) => {
    setSelections(prev => {
      if (category === 'fruits' || category === 'dryToppings' || category === 'drizzles') {
        const arr = prev[category];
        const exists = arr.find(i => i.id === item.id);
        if (exists) {
          return { ...prev, [category]: arr.filter(i => i.id !== item.id) };
        }
        return { ...prev, [category]: [...arr, item] };
      }
      return { ...prev, [category]: item };
    });
  };

  const calculateNutrition = () => {
    const nutrition = { calories: 0, protein: 0, carbs: 0, fiber: 0, sugar: 0 };
    
    if (selections.base?.nutrition) {
      Object.keys(nutrition).forEach(key => {
        nutrition[key] += selections.base.nutrition[key];
      });
    }
    if (selections.granola?.nutrition) {
      Object.keys(nutrition).forEach(key => {
        nutrition[key] += selections.granola.nutrition[key];
      });
    }
    selections.fruits.forEach(f => {
      if (f.nutrition) {
        Object.keys(nutrition).forEach(key => {
          nutrition[key] += f.nutrition[key];
        });
      }
    });
    selections.dryToppings.forEach(t => {
      if (t.nutrition) {
        Object.keys(nutrition).forEach(key => {
          nutrition[key] += t.nutrition[key];
        });
      }
    });
    selections.drizzles.forEach(d => {
      if (d.nutrition) {
        Object.keys(nutrition).forEach(key => {
          nutrition[key] += d.nutrition[key];
        });
      }
    });
    
    return nutrition;
  };

  const calculateTotal = () => {
    let total = 0;
    if (selections.base) total += selections.base.price;
    if (selections.granola) total += selections.granola.price;
    selections.fruits.forEach(f => total += f.price);
    selections.dryToppings.forEach(t => total += t.price);
    selections.drizzles.forEach(d => total += d.price);
    return total;
  };

  const handleAddToCart = () => {
    if (!selections.base) {
      alert('Please select a base!');
      return;
    }
    const customItem = {
      id: 'custom-bowl',
      name: 'Custom Bowl',
      description: `${selections.base.name}${selections.granola ? ' + ' + selections.granola.name : ''}${selections.fruits.length ? ' + ' + selections.fruits.map(f => f.name).join(', ') : ''}${selections.dryToppings.length ? ' + ' + selections.dryToppings.map(t => t.name).join(', ') : ''}${selections.drizzles.length ? ' + ' + selections.drizzles.map(d => d.name).join(', ') : ''}`,
      price: calculateTotal(),
      category: 'custom',
      image: selections.base.image
    };
    addItem(customItem, 1, selections);
    alert('Custom bowl added to cart!');
    setSelections({ base: null, granola: null, fruits: [], dryToppings: [], drizzles: [] });
    setCurrentStep(0);
  };

  const setPreset = (preset) => {
    setGoals(PRESETS[preset]);
  };

  const nutrition = calculateNutrition();

  const getProgressColor = (current, goal) => {
    const percentage = (current / goal) * 100;
    if (percentage <= 70) return 'bg-green-500';
    if (percentage <= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressWidth = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {bases.map(base => (
              <div
                key={base.id}
                onClick={() => handleSelect('base', base)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${selections.base?.id === base.id ? 'bg-[#008000] text-white' : 'bg-white hover:shadow-lg'}`}
              >
                <p className="font-semibold text-center">{base.name}</p>
                <p className={`text-sm text-center mt-1 ${selections.base?.id === base.id ? 'text-white/80' : 'text-[#008000]'}`}>₹{base.price}</p>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {granola.map(g => (
              <div
                key={g.id}
                onClick={() => handleSelect('granola', g)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${selections.granola?.id === g.id ? 'bg-[#008000] text-white' : 'bg-white hover:shadow-lg'}`}
              >
                <p className="font-semibold text-center">{g.name}</p>
                <p className={`text-sm text-center mt-1 ${selections.granola?.id === g.id ? 'text-white/80' : 'text-[#008000]'}`}>+₹{g.price}</p>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {fruitToppings.map(fruit => (
              <div
                key={fruit.id}
                onClick={() => handleSelect('fruits', fruit)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${selections.fruits.find(f => f.id === fruit.id) ? 'bg-[#008000] text-white' : 'bg-white hover:shadow-lg'}`}
              >
                <p className="font-semibold text-sm text-center">{fruit.name}</p>
                <p className={`text-xs text-center mt-1 ${selections.fruits.find(f => f.id === fruit.id) ? 'text-white/80' : 'text-[#008000]'}`}>+₹{fruit.price}</p>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {dryToppings.map(topping => (
              <div
                key={topping.id}
                onClick={() => handleSelect('dryToppings', topping)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${selections.dryToppings.find(t => t.id === topping.id) ? 'bg-[#008000] text-white' : 'bg-white hover:shadow-lg'}`}
              >
                <p className="font-semibold text-sm text-center">{topping.name}</p>
                <p className={`text-xs text-center mt-1 ${selections.dryToppings.find(t => t.id === topping.id) ? 'text-white/80' : 'text-[#008000]'}`}>+₹{topping.price}</p>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {drizzles.map(drizzle => (
              <div
                key={drizzle.id}
                onClick={() => handleSelect('drizzles', drizzle)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${selections.drizzles.find(d => d.id === drizzle.id) ? 'bg-[#008000] text-white' : 'bg-white hover:shadow-lg'}`}
              >
                <p className="font-semibold text-sm text-center">{drizzle.name}</p>
                <p className={`text-xs text-center mt-1 ${selections.drizzles.find(d => d.id === drizzle.id) ? 'text-white/80' : 'text-[#008000]'}`}>+₹{drizzle.price}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8">
      {/* Nutrition Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Daily Nutrition Tracker</h3>
          <button 
            onClick={() => setShowGoals(!showGoals)}
            className="text-[#008000] font-medium hover:underline"
          >
            {showGoals ? 'Hide Goals' : 'Set Goals'}
          </button>
        </div>

        {showGoals && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setPreset('weightLoss')} className="px-3 py-1 text-xs bg-[#008000] text-white rounded-full">Weight Loss</button>
              <button onClick={() => setPreset('muscleGain')} className="px-3 py-1 text-xs bg-[#008000] text-white rounded-full">Muscle Gain</button>
              <button onClick={() => setPreset('maintenance')} className="px-3 py-1 text-xs bg-[#008000] text-white rounded-full">Maintenance</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.keys(goals).map(key => (
                <div key={key}>
                  <label className="text-xs text-gray-500 capitalize">{key}</label>
                  <input
                    type="number"
                    value={goals[key]}
                    onChange={(e) => setGoals({ ...goals, [key]: Number(e.target.value) })}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Calories', key: 'calories', unit: 'kcal' },
            { label: 'Protein', key: 'protein', unit: 'g' },
            { label: 'Carbs', key: 'carbs', unit: 'g' },
            { label: 'Fiber', key: 'fiber', unit: 'g' },
            { label: 'Sugar', key: 'sugar', unit: 'g' }
          ].map(item => (
            <div key={item.key} className="text-center">
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="text-xl font-bold text-[#008000]">
                {Math.round(nutrition[item.key])}{item.unit}
              </div>
              <div className="text-xs text-gray-400">of {goals[item.key]}{item.unit}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(nutrition[item.key], goals[item.key])}`}
                  style={{ width: `${getProgressWidth(nutrition[item.key], goals[item.key])}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        {STEPS.map((step, index) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => setCurrentStep(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === currentStep 
                  ? 'bg-[#008000] text-white' 
                  : index < currentStep 
                    ? 'bg-[#008000]/20 text-[#008000]' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </button>
            {index < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${index < currentStep ? 'bg-[#008000]' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#2d2a26] mb-4" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>
          Choose Your {STEPS[currentStep]}
        </h3>
        {renderStepContent()}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <h4 className="font-bold text-lg mb-4">Your Bowl</h4>
        <div className="space-y-2 text-sm">
          {selections.base && (
            <div className="flex justify-between">
              <span>Base: {selections.base.name}</span>
              <span>₹{selections.base.price}</span>
            </div>
          )}
          {selections.granola && (
            <div className="flex justify-between">
              <span>Granola: {selections.granola.name}</span>
              <span>₹{selections.granola.price}</span>
            </div>
          )}
          {selections.fruits.length > 0 && (
            <div className="flex justify-between">
              <span>Fruits: {selections.fruits.map(f => f.name).join(', ')}</span>
              <span>₹{selections.fruits.reduce((a, b) => a + b.price, 0)}</span>
            </div>
          )}
          {selections.dryToppings.length > 0 && (
            <div className="flex justify-between">
              <span>Toppings: {selections.dryToppings.map(t => t.name).join(', ')}</span>
              <span>₹{selections.dryToppings.reduce((a, b) => a + b.price, 0)}</span>
            </div>
          )}
          {selections.drizzles.length > 0 && (
            <div className="flex justify-between">
              <span>Drizzles: {selections.drizzles.map(d => d.name).join(', ')}</span>
              <span>₹{selections.drizzles.reduce((a, b) => a + b.price, 0)}</span>
            </div>
          )}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-[#008000]">₹{calculateTotal()}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selections.base}
          className={`w-full mt-4 py-3 rounded-full font-semibold transition-colors ${
            selections.base 
              ? 'bg-[#008000] text-white hover:bg-[#006400]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}