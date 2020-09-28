import React from 'react';
import { Transfer, Table, Modal } from 'antd';
export default function TaskTransfer({
  columns,
  visible,
  onCancel,
  onOk,
  ...restProps
}) {
  return (
    <Modal
      forceRender
      title="导入任务"
      width={1200}
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Transfer
        rowKey={(record) => record._id}
        {...restProps}
        showSelectAll={false}
      >
        {({
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
        }) => {
          const rowSelection = {
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows.map(({ _id }) => _id);
              onItemSelectAll(
                selected ? treeSelectedKeys : listSelectedKeys,
                selected
              );
            },
            onSelect({ _id }, selected) {
              onItemSelect(_id, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              pagination={false}
              scroll={{ y: 300 }}
              rowSelection={rowSelection}
              rowKey="_id"
              columns={columns}
              dataSource={filteredItems}
              size="small"
              onRow={({ _id }) => ({
                onClick: () => {
                  onItemSelect(_id, !listSelectedKeys.includes(_id));
                },
              })}
            />
          );
        }}
      </Transfer>
    </Modal>
  );
}
