import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(customParseFormat);

export default dayjs;
