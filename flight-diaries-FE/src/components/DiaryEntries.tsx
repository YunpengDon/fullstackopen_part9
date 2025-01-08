import { DiaryEntry } from "../../types";

const DiaryEntries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
            {diary.comment ? (
              <>
                <br />
                comment: {diary.comment}
              </>
            ) : null}
          </p>
        </div>
      ))}
    </>
  );
};

export default DiaryEntries;
