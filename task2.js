/**
 * Задание 2
 * Написать скрипт который наделяет элемент с атрибутом dragAndDrop возможностью перемещаться по экрану
 * по алгоритму Drag and drop.
 **/

/**
 * Алгоритм
 *
 * 1. Отследить событие mousedown на перетаскиваемом элементе
 *
 * 2. При mousemove - задавать элементу новые координаты
 *
 * 3. При mouseup - "отпустить" элемент  (удалить ненужные обработчики)
 *
 * 4. "Запомнить" положение курсора относительно элемента
 *    (подсказка: можно использовать .getBoundingClientRect();)
 * 5. Передвигать элемент в рамках определенного контейнера
 *    (подсказка: необходимо задать минимальное и максимально перемещение по осям X и Y)
 **/


 document.addEventListener('mousedown', event => {
    const dragElement = event.target;
    if (dragElement.hasAttribute('dragAndDrop')) {
        dragElement.style.position = 'absolute';
        dragElement.style.zIndex = '1000';

        // перемещение элемента
        const onMouseMove = event => {
            moveAt(event.pageX, event.pageY, dragElement);
        }
        // удаление неиспользуемых (больше) обработчиков
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            dragElement.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        dragElement.addEventListener('mouseup', onMouseUp);
    }
});

function moveAt(pageX, pageY, dragElement) {
    dragElement.style.left = pageX + 'px';
    dragElement.style.top = pageY + 'px';
}


const container = document.querySelector(".container");

document.addEventListener("mousedown", (event) => {
    const field = {
        maxTop: container.offsetHeight,
        maxLeft: container.offsetWidth,
        minTop: container.offsetTop,
        minLeft: container.offsetLeft,
    };

    const dragElement = event.target;
    
    if (dragElement.hasAttribute("dragAndDrop")) {
        dragElement.style.position = "absolute";
        dragElement.style.zIndex = "1000";

        const moveAt = (pageX, pageY) => {
            if (
                pageX >=
                field.maxLeft + field.minLeft - dragElement.offsetWidth / 2
            ) {
                // расчеты для того, чтобы картинка не выходила за правый край блока
                dragElement.style.left =
                    field.maxLeft +
                    field.minLeft -
                    dragElement.offsetWidth +
                    "px";
            } else if (pageX - dragElement.offsetWidth / 2 <     field.minLeft) {
                // чтобы картинка не выходила за левый край блока
                dragElement.style.left = field.minLeft;
            } else {
                dragElement.style.left =
                    pageX - dragElement.offsetWidth / 2 + "px";
            }

            if (
                pageY >=
                field.maxTop - dragElement.offsetHeight / 2 + field.minTop
            ) {
                // чтобы не выходила за нижний краый блока
                dragElement.style.top =
                    field.maxTop +
                    field.minTop -
                    dragElement.offsetHeight +
                    "px";
            } else if (pageY - dragElement.offsetHeight / 2 <= field.minTop) {
                // чтобы не выходила за верхний край блока
                dragElement.style.top = field.minTop + "px";
            } else {
                dragElement.style.top =
                    pageY - dragElement.offsetHeight / 2 + "px";
            }
        };

        dragElement.ondragstart = function () {
            return false;
        };

        // перемещение элемента
        const onMouseMove = (event) => {
            moveAt(event.pageX, event.pageY);
        };
        // удаление неиспользуемых (больше) обработчиков
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
});
