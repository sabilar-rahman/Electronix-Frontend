


const TimelineSteps = ({
  step,
  order,
  isCompleted,
  isCurrent,
  isLastStep,
  description,
  
}) => {
  const connectorClass = isCompleted ? "bg-primary" : "bg-gray-500";
  const circleClass = isCompleted
    ? "bg-primary text-white"
    : isCurrent
    ? "bg-white border-2 border-primary text-primary"
    : "bg-gray-200 text-gray-500";
  const labelTextColor = isCompleted || isCurrent ? "text-primary" : "text-gray-500";
  const descriptionTextColor = isCompleted || isCurrent ? "text-primary" : "text-gray-500";

  return (
    <li className="relative flex flex-col items-center sm:items-start sm:flex-row p-4">
      {/* Timeline Circle */}
      <div className="flex items-center z-10">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${circleClass}`}
        >
          <i className={`ri-checkbox-circle-line text-lg`}></i>
        </div>
        {!isLastStep && (
          <div
            className={`hidden sm:block w-1 h-8 mx-2 sm:h-1 sm:w-8 ${connectorClass}`}
          ></div>
        )}
      </div>

      {/* Step Details */}
      <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <h3 className={`text-sm font-semibold ${labelTextColor}`}>
          {step.title}
        </h3>
        <p className={`text-xs ${descriptionTextColor}`}>{description}</p>

        {/* Date */}
        
          <time className="block text-xs text-gray-400">
            {order.updatedAt? new Date(order.updatedAt).toDateString():"Time"}
          </time>
        
      </div>
    </li>
  );
};

export default TimelineSteps;

