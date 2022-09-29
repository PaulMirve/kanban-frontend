import styles from "@sass/components/add-task-modal.module.scss";
import { FieldArray, Form, Formik, FormikProps, FormikValues } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useCreateSubtaskMutation,
  useCreateTaskMutation,
} from "../slices/columnApiSlice";
import { RootState } from "../store";
import Button from "./Button";
import Icon from "./Icon";
import Modal, { ModalProps } from "./Modal";
import Select from "./Select";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import Typography from "./Typography";

type Props = ModalProps;

const AddTaskModal = ({ ...props }: Props) => {
  const [createTask] = useCreateTaskMutation();
  const [createSubtask] = useCreateSubtaskMutation();
  const columns = useSelector((state: RootState) => state.columns);
  const [column, setColumn] = useState<number>(0);
  const form = useRef<FormikProps<FormikValues>>(null);

  useEffect(() => {
    if (columns.length) {
      setColumn(columns[0].id);
    }
  }, [columns]);

  const onCreateTask = async (
    title: string,
    description: string,
    subtasks: string[],
  ) => {
    try {
      const task = await createTask({
        title,
        description,
        column,
      }).unwrap();
      subtasks.forEach((description) => {
        createSubtask({ task: task.id, description });
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.onCancel();
    }
  };

  return (
    <Modal
      {...props}
      onCancel={() => {
        props.onCancel();
        form.current?.resetForm();
      }}
      deleteButton={false}
      okButtonText="Create task"
      menu={false}
      okButtonVariant="primary"
      onOk={() => {
        if (form.current) {
          form.current.handleSubmit();
        }
      }}>
      <Formik
        initialValues={{ title: "", description: "", subtasks: ["", ""] }}
        onSubmit={({ title, description, subtasks }, { resetForm }) => {
          onCreateTask(title, description, subtasks);
          resetForm();
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Task's name is required"),
          description: Yup.string().required("Task's description is required"),
          subtasks: Yup.array().of(
            Yup.string().required("Description required"),
          ),
        })}
        innerRef={form}>
        {() => (
          <Form>
            <div className={styles.form}>
              <TextInput
                name="title"
                label="Title"
                placeholder="e.g. Take coffee break"
              />
              <TextArea
                name="description"
                label="Description"
                placeholder="e.g. It's always good to take a break. this 15 minute break will recharge the batteries a little"
                rows={5}
              />

              <span className={styles.subtasks}>
                <Typography style={{ color: "var(--grey)" }}>
                  Subtasks
                </Typography>
                <FieldArray
                  name="subtasks"
                  render={({ form, push, remove }) => {
                    const { values } = form;
                    const { subtasks } = values;
                    return (
                      <>
                        {subtasks.map((_: void, index: number) => {
                          let placeholder;
                          if (index === 0) {
                            placeholder = "e.g. Make coffee";
                          } else if (index === 1) {
                            placeholder = "e.g. Drink coffee & smile";
                          }
                          return (
                            <div key={index} className={styles.subtaskBox}>
                              <TextInput
                                name={`subtasks[${index}]`}
                                wrapperProps={{ style: { flex: 1 } }}
                                placeholder={placeholder}
                              />
                              <Icon
                                onClick={() => remove(index)}
                                name="close"
                              />
                            </div>
                          );
                        })}
                        <Button
                          type="button"
                          onClick={() => push("")}
                          variant="secondary"
                          icon="plus"
                          size="small">
                          Add new subtask
                        </Button>
                      </>
                    );
                  }}
                />
              </span>
              <Select
                label="Status"
                value={column}
                onChange={(value) => {
                  if (typeof value === "number") setColumn(value);
                }}
                options={Object.values(columns).map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}></Select>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTaskModal;
