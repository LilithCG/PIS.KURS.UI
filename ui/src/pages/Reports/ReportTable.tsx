import React, {useEffect, useState} from "react";

export const ReportTable = () => {
    const [updater, setUpdater] = useState(true);
    const update = () => setUpdater(!updater);


    return (
        <div style={{padding: 20}}>
            Отчеты
        </div>
    );
}
