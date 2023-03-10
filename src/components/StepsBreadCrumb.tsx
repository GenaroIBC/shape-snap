import { STEP_LIST, TOTAL_STEPS } from '../constants';

type Props = {
  currentStep: number;
};

export function StepsBreadCrumb({ currentStep }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <nav className="flex flex-wrap gap-6 text-sm md:text-lg">
        {STEP_LIST.map((stepTitle, index) => (
          <span
            className={`after:content-['>'] relative -z-10 after:absolute
            after:-right-4 last-of-type:after:content-[''] ${currentStep === index ? 'underline' : ''}`}
            key={index}
          >
            {stepTitle}
          </span>
        ))}
      </nav>
      <progress value={currentStep} max={TOTAL_STEPS - 1} className="w-full" />
    </header>
  );
}
