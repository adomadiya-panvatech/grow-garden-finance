import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Users, User, Baby } from 'lucide-react';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  childrenCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Child {
  id: string;
  parentId: string;
  parentName: string;
  name: string;
  age: number;
  notes: string;
  totalSavings: number;
  level: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'parents' | 'children'>('parents');
  const [isAddParentOpen, setIsAddParentOpen] = useState(false);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const [parents, setParents] = useState<Parent[]>([
    {
      id: '1',
      name: 'Sarah Garden',
      email: 'sarah@demo.com',
      phone: '+1 (555) 123-4567',
      childrenCount: 2,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael@demo.com',
      phone: '+1 (555) 987-6543',
      childrenCount: 1,
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily@demo.com',
      phone: '+1 (555) 456-7890',
      childrenCount: 3,
      status: 'inactive',
      createdAt: '2024-01-05'
    }
  ]);

  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      parentId: '1',
      parentName: 'Sarah Garden',
      name: 'Alex Garden',
      age: 10,
      notes: 'Loves saving for video games',
      totalSavings: 45.50,
      level: 3,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      parentId: '1',
      parentName: 'Sarah Garden',
      name: 'Jamie Garden',
      age: 8,
      notes: 'Interested in plants and nature',
      totalSavings: 23.25,
      level: 2,
      status: 'active',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      parentId: '2',
      parentName: 'Michael Brown',
      name: 'Taylor Brown',
      age: 12,
      notes: 'Saving for a bicycle',
      totalSavings: 78.90,
      level: 4,
      status: 'active',
      createdAt: '2024-01-12'
    }
  ]);

  const [newParent, setNewParent] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [newChild, setNewChild] = useState({
    parentId: '',
    name: '',
    age: '',
    notes: ''
  });

  const [editParentForm, setEditParentForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [editChildForm, setEditChildForm] = useState({
    name: '',
    age: '',
    notes: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleAddParent = () => {
    if (!newParent.name || !newParent.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const parent: Parent = {
      id: Date.now().toString(),
      name: newParent.name,
      email: newParent.email,
      phone: newParent.phone,
      childrenCount: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setParents([...parents, parent]);
    setNewParent({ name: '', email: '', phone: '' });
    setIsAddParentOpen(false);
    
    toast({
      title: "Success! 👨‍👩‍👧‍👦",
      description: `${parent.name} has been added as a parent.`
    });
  };

  const handleAddChild = () => {
    if (!newChild.parentId || !newChild.name || !newChild.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const parentName = parents.find(p => p.id === newChild.parentId)?.name || '';
    const child: Child = {
      id: Date.now().toString(),
      parentId: newChild.parentId,
      parentName,
      name: newChild.name,
      age: parseInt(newChild.age),
      notes: newChild.notes,
      totalSavings: 0,
      level: 1,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setChildren([...children, child]);
    
    // Update parent's children count
    setParents(parents.map(p => 
      p.id === newChild.parentId 
        ? { ...p, childrenCount: p.childrenCount + 1 }
        : p
    ));

    setNewChild({ parentId: '', name: '', age: '', notes: '' });
    setIsAddChildOpen(false);
    
    toast({
      title: "Success! 🌱",
      description: `${child.name} has been added as a child.`
    });
  };

  const handleDeleteParent = (parentId: string) => {
    const parent = parents.find(p => p.id === parentId);
    if (!parent) return;

    // Remove parent and their children
    setParents(parents.filter(p => p.id !== parentId));
    setChildren(children.filter(c => c.parentId !== parentId));
    
    toast({
      title: "Parent Removed",
      description: `${parent.name} and their children have been removed.`,
    });
  };

  const handleDeleteChild = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child) return;

    setChildren(children.filter(c => c.id !== childId));
    
    // Update parent's children count
    setParents(parents.map(p => 
      p.id === child.parentId 
        ? { ...p, childrenCount: p.childrenCount - 1 }
        : p
    ));
    
    toast({
      title: "Child Removed",
      description: `${child.name} has been removed.`,
    });
  };

  const handleEditParent = (parent: Parent) => {
    setEditingParent(parent);
    setEditParentForm({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      status: parent.status
    });
  };

  const handleUpdateParent = () => {
    if (!editingParent || !editParentForm.name || !editParentForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedParents = parents.map(p => 
      p.id === editingParent.id 
        ? { ...p, ...editParentForm }
        : p
    );

    setParents(updatedParents);
    setEditingParent(null);
    setEditParentForm({ name: '', email: '', phone: '', status: 'active' });
    
    toast({
      title: "Success! ✏️",
      description: `${editParentForm.name}'s information has been updated.`
    });
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
    setEditChildForm({
      name: child.name,
      age: child.age.toString(),
      notes: child.notes,
      status: child.status
    });
  };

  const handleUpdateChild = () => {
    if (!editingChild || !editChildForm.name || !editChildForm.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedChildren = children.map(c => 
      c.id === editingChild.id 
        ? { ...c, name: editChildForm.name, age: parseInt(editChildForm.age), notes: editChildForm.notes, status: editChildForm.status }
        : c
    );

    setChildren(updatedChildren);
    setEditingChild(null);
    setEditChildForm({ name: '', age: '', notes: '', status: 'active' });
    
    toast({
      title: "Success! ✏️",
      description: `${editChildForm.name}'s information has been updated.`
    });
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-800">👥 User Management</h2>
          <p className="text-green-600">Manage parents and children accounts</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveTab('parents')}
            variant={activeTab === 'parents' ? 'default' : 'outline'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Users className="w-4 h-4 mr-2" />
            Parents ({parents.length})
          </Button>
          <Button
            onClick={() => setActiveTab('children')}
            variant={activeTab === 'children' ? 'default' : 'outline'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Baby className="w-4 h-4 mr-2" />
            Children ({children.length})
          </Button>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center">
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        {activeTab === 'parents' ? (
          <Dialog open={isAddParentOpen} onOpenChange={setIsAddParentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Parent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Parent</DialogTitle>
                <DialogDescription>
                  Enter the parent's information to create their account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="parent-name">Name *</Label>
                  <Input
                    id="parent-name"
                    value={newParent.name}
                    onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                    placeholder="Enter parent's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="parent-email">Email *</Label>
                  <Input
                    id="parent-email"
                    type="email"
                    value={newParent.email}
                    onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="parent-phone">Phone Number</Label>
                  <Input
                    id="parent-phone"
                    value={newParent.phone}
                    onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddParentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddParent} className="bg-green-600 hover:bg-green-700">
                    Add Parent
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Child</DialogTitle>
                <DialogDescription>
                  Enter the child's information to create their account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="child-parent">Parent *</Label>
                  <select
                    id="child-parent"
                    value={newChild.parentId}
                    onChange={(e) => setNewChild({...newChild, parentId: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a parent</option>
                    {parents.filter(p => p.status === 'active').map(parent => (
                      <option key={parent.id} value={parent.id}>{parent.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="child-name">Name *</Label>
                  <Input
                    id="child-name"
                    value={newChild.name}
                    onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                    placeholder="Enter child's name"
                  />
                </div>
                <div>
                  <Label htmlFor="child-age">Age *</Label>
                  <Input
                    id="child-age"
                    type="number"
                    min="3"
                    max="18"
                    value={newChild.age}
                    onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                    placeholder="Enter child's age"
                  />
                </div>
                <div>
                  <Label htmlFor="child-notes">Notes</Label>
                  <Input
                    id="child-notes"
                    value={newChild.notes}
                    onChange={(e) => setNewChild({...newChild, notes: e.target.value})}
                    placeholder="Any special notes or interests"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddChildOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddChild} className="bg-blue-600 hover:bg-blue-700">
                    Add Child
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Edit Parent Dialog */}
      <Dialog open={!!editingParent} onOpenChange={() => setEditingParent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Parent</DialogTitle>
            <DialogDescription>
              Update the parent's information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-parent-name">Name *</Label>
              <Input
                id="edit-parent-name"
                value={editParentForm.name}
                onChange={(e) => setEditParentForm({...editParentForm, name: e.target.value})}
                placeholder="Enter parent's full name"
              />
            </div>
            <div>
              <Label htmlFor="edit-parent-email">Email *</Label>
              <Input
                id="edit-parent-email"
                type="email"
                value={editParentForm.email}
                onChange={(e) => setEditParentForm({...editParentForm, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="edit-parent-phone">Phone Number</Label>
              <Input
                id="edit-parent-phone"
                value={editParentForm.phone}
                onChange={(e) => setEditParentForm({...editParentForm, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label htmlFor="edit-parent-status">Status</Label>
              <select
                id="edit-parent-status"
                value={editParentForm.status}
                onChange={(e) => setEditParentForm({...editParentForm, status: e.target.value as 'active' | 'inactive'})}
                className="w-full p-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingParent(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateParent} className="bg-green-600 hover:bg-green-700">
                Update Parent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Child Dialog */}
      <Dialog open={!!editingChild} onOpenChange={() => setEditingChild(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Child</DialogTitle>
            <DialogDescription>
              Update the child's information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-child-name">Name *</Label>
              <Input
                id="edit-child-name"
                value={editChildForm.name}
                onChange={(e) => setEditChildForm({...editChildForm, name: e.target.value})}
                placeholder="Enter child's name"
              />
            </div>
            <div>
              <Label htmlFor="edit-child-age">Age *</Label>
              <Input
                id="edit-child-age"
                type="number"
                min="3"
                max="18"
                value={editChildForm.age}
                onChange={(e) => setEditChildForm({...editChildForm, age: e.target.value})}
                placeholder="Enter child's age"
              />
            </div>
            <div>
              <Label htmlFor="edit-child-notes">Notes</Label>
              <Input
                id="edit-child-notes"
                value={editChildForm.notes}
                onChange={(e) => setEditChildForm({...editChildForm, notes: e.target.value})}
                placeholder="Any special notes or interests"
              />
            </div>
            <div>
              <Label htmlFor="edit-child-status">Status</Label>
              <select
                id="edit-child-status"
                value={editChildForm.status}
                onChange={(e) => setEditChildForm({...editChildForm, status: e.target.value as 'active' | 'inactive'})}
                className="w-full p-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingChild(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateChild} className="bg-blue-600 hover:bg-blue-700">
                Update Child
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content */}
      {activeTab === 'parents' ? (
        <Card className="garden-card">
          <CardHeader>
            <CardTitle className="text-green-800">👨‍👩‍👧‍👦 Parents Management</CardTitle>
            <CardDescription>
              Manage parent accounts and their associated children
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell className="font-medium">{parent.name}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {parent.childrenCount} child{parent.childrenCount !== 1 ? 'ren' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={parent.status === 'active' ? 'default' : 'secondary'}>
                        {parent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(parent.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditParent(parent)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteParent(parent.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChildren.map((child) => (
            <Card key={child.id} className="garden-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">🌱</div>
                    <div>
                      <CardTitle className="text-lg text-green-800">{child.name}</CardTitle>
                      <CardDescription className="text-sm">
                        Age {child.age} • {child.parentName}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={child.status === 'active' ? 'default' : 'secondary'}>
                    Level {child.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">Total Savings</span>
                    <span className="font-bold text-green-600">
                      ${child.totalSavings.toFixed(2)}
                    </span>
                  </div>
                  
                  {child.notes && (
                    <div>
                      <span className="text-sm text-gray-600">Notes:</span>
                      <p className="text-sm text-gray-800 italic">{child.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Created: {new Date(child.createdAt).toLocaleDateString()}</span>
                    <Badge variant={child.status === 'active' ? 'default' : 'secondary'}>
                      {child.status}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditChild(child)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteChild(child.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
