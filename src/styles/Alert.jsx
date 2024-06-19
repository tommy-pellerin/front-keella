import { BellAlertIcon } from "@heroicons/react/24/outline";

const Alert = ({ showAlert, setShowAlert, message, type }) => {
  if (!showAlert) {
    return null;
  }

  let bgColor;

  switch (type) {
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-orange-500';
      break;
    case 'success':
      bgColor = 'bg-green-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  return (
    <div className={`fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white px-6 py-4 border-0 rounded mb-4 ${bgColor}`}>
      <span className="text-xl inline-block mr-5 align-middle">
        <BellAlertIcon class="h-6 w-6 text-gray-500" />
      </span>
      <span className="inline-block align-middle mr-8">
        {message}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => setShowAlert(false)}
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;