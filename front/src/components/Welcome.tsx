export const Welcome = () => (
  <div className="flex flex-col justify-center items-center h-full w-1/2">
    <h1 className="text-3xl font-bold">Hey!</h1> <br />
    <p className="m-0 indent-0">
      This application uses{' '}
      <a
        className="link link-primary"
        href="https://huggingface.co/arpanghoshal/EmoRoBERTa"
      >
        EmoRoBERTa
      </a>{' '}
      to visualise sentiment analysis.
    </p>
    <p>
      Dataset we're analyzing is{' '}
      <a
        className="link link-primary"
        href="https://huggingface.co/datasets/webis/tldr-17"
      >
        tldr-17
      </a>{' '}
      (reddit posts) which we shrinked to 77k samples.
    </p>
    <br />
    <br />
    <h2 className="text-2xl font-bold">Individual analysis</h2>
    <p>
      Individual analysis is a chart that shows the sentiment of a single
      sentence. You can analyze a sentence by typing it in the prompt bar on the
      navbar.
    </p>
    <br />
    <h2 className="text-2xl font-bold">PCA analysis</h2>
    <p>
      PCA analysis is a chart that shows the sentiment of a dataset. You can
      change the number of samples by using the slider on the navbar - the
      performance of the chart depends on the number of samples. Moreover, you
      can add your own message to the dataset by typing it in the prompt bar on
      the navbar. It's going to be displayed as a star instead of a circle.
    </p>
  </div>
);
